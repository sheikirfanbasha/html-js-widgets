//wire the view and model
var autoCompleteTA = null;

function init(){
	var el = document.getElementById("textarea");
	autoCompleteTA = new AutoCompleteTextArea(el);
}

function loadAutoComplete(){
	var autoComplete = document.getElementById("autoComplete");
	if(autoComplete){
		autoComplete.remove();
	}
	var searchWord = autoCompleteTA.getSearchableWord();
	var possibleMatches = modelSearch(searchWord);
	console.log(searchWord);
	console.log(possibleMatches);
	var pos = getCaretPixelPos(textarea);
	var d = document.createElement("div");
	var divStyle = {
		position: "absolute",
		top: pos.top + 27 + "px",
		left: pos.left + "px",
		width: "100px",
		height: "60px",
		border:"1px solid black",
		overflow: "scroll"
	}
	var styleStr = objToStyle(divStyle);
	d.setAttribute("style", styleStr);
	d.setAttribute("id", "autoComplete");
	possibleMatches.map(function(word){
		var span = document.createElement("span");
		span.innerHTML = word;
		span.setAttribute("class", "searchResult");
		span.setAttribute("onclick", "handleAutoSearchResultClick(this)")
		d.appendChild(span);
	});
	document.getElementsByTagName("body")[0].appendChild(d);
}

function handleAutoSearchResultClick(el){
	autoCompleteTA.updateSearchResult(el.innerHTML);
	console.log(el);
}

function objToStyle(style){
	var str = "";
	for(var key in style){
		str += key + ":" + style[key] + ";"
	}
	return str;
}
var getCaretPixelPos = function ($node, offsetx, offsety){
    offsetx = offsetx || 0;
    offsety = offsety || 0;

    var nodeLeft = 0,
        nodeTop = 0;
    if ($node){
        nodeLeft = $node.offsetLeft;
        nodeTop = $node.offsetTop;
    }

    var pos = {left: 0, top: 0};

    if (document.selection){
        var range = document.selection.createRange();
        pos.left = range.offsetLeft + offsetx - nodeLeft;
        pos.top = range.offsetTop + offsety - nodeTop;
    }else if (window.getSelection){
        var sel = window.getSelection();
        var range = sel.getRangeAt(0).cloneRange();
        try{
            range.setStart(range.startContainer, range.startOffset-1);
        }catch(e){
        	// Range was not selected because offset was negative
        	// Ignore error: DOMException: Failed to execute 'setStart' on 'Range': The offset -1 is larger than or equal to the node's length
        }
        var rect = range.getBoundingClientRect();
        if (range.endOffset == 0 || range.toString() === ''){
            // first char of line
            if (range.startContainer == $node){
                // empty div
                if (range.endOffset == 0){
                    pos.top =  offsetx;
                    pos.left = offsety;
                }else{
                    // firefox needs this
                    var range2 = range.cloneRange();
                    range2.setStart(range2.startContainer, 0);
                    var rect2 = range2.getBoundingClientRect();
                    pos.left = rect2.left + offsetx - nodeLeft;
                    pos.top = rect2.top + rect2.height + offsety - nodeTop;
                }
            }else{
            	// not empty div
                if(range.startContainer.offsetTop){
                	// range was selected
                    pos.top = range.startContainer.offsetTop;
                    pos.left = range.startContainer.offsetLeft;
                }else{
                	// range was not selected (probably because caret is at first char of line that already had text)
                    pos.left = rect.left + rect.width + offsetx - nodeLeft;
                    pos.top = rect.top + offsety - nodeTop;

                }
            }
        }else{
        	// not first char of line
            pos.left = rect.left + rect.width + offsetx - nodeLeft;
            pos.top = rect.top + offsety - nodeTop;
        }
    }
    return pos;
};