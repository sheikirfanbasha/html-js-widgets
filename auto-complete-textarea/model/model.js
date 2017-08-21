var wordDic = new Trie();
//contains all valid text that can be used by the user
var validWords = ["timestamp", "type", "amount",
			 "accountnumOrig", "nameOrig", 
			 "oldbalanceOrig", "newbalanceOrig", 
			 "countryOrig", "accountnumDest", 
			 "nameDest", "oldbalanceDest", "newbalanceDest",
			  "countryDest"];

function addAdditionalSymbols(){
	validWords.push("==");
	validWords.push(">");
	validWords.push(">=");
	validWords.push("<");
	validWords.push("<=");
	validWords.push("&&");
	validWords.push("||");
}

addAdditionalSymbols();
validWords.map(function(word){
	wordDic.add(word);
});

//build efficient datastructure for the model and expose
function modelSearch(word){
	return wordDic.getWordsForPattern(wordDic.root,word);
}