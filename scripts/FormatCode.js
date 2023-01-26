window.addEventListener("load", function() {
    let Pre = document.getElementsByTagName("pre")
    let AffectedElements = [];
    for (var x = 0; x < Pre.length; x++) {
        AffectedElements.push(Pre[x].children[0])
    }
    for (var x = 0; x < AffectedElements.length; x++) {
        let CurrentInner = AffectedElements[x].innerHTML;
        let NewInner = "";
        let Lines = CurrentInner.split("\n");
        let Depth = 0;
        for (var y = 0; y < Lines.length; y++) {
            if (Lines[y].endsWith("{")) {
                Depth++;
            }
            else if (Lines[y].endsWith("}")) {
                Depth--;
            }

            if (Depth != 0) {
                for (let z = 0; z < Depth; z++) {
                    NewInner += "&emsp;"
                }
            }
            NewInner += Lines[y] + "\n";
        }
        AffectedElements[x].innerHTML = NewInner;
    }
})