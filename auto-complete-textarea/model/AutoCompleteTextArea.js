function AutoCompleteTextArea(element){
	this.element = element;
}
AutoCompleteTextArea.prototype.updateSearchResult = function(result){
	var value = this.element.innerHTML;
	var lastSpaceIndex = value.lastIndexOf(" ");
	this.element.innerHTML = value.substr(0, lastSpaceIndex) + result;
}
AutoCompleteTextArea.prototype.getSearchableWord = function(){
	var value = this.element.innerHTML;
	var lastSpaceIndex = value.lastIndexOf(" ");
	var searchWord = "";
	if(lastSpaceIndex == -1){
		searchWord = value.substr(0);
	}else{
		searchWord = value.substr(lastSpaceIndex + 1);
	}
	return searchWord;
}
