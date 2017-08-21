function Node(val){
	this.val = val;
	this.parent = null;
	this.children = [];
	this.word = false;
	this.validWords = [];
}

function Trie(){
	this.root = null;
}

Trie.prototype.insert = function(root, word, i){
	//if we have inserted all the characters then return
	if(i == word.length){
		root.word = true;
		return;
	}
	//if the root has no children then add new node as child and
	// return
	if(root.children.length == 0){
		var n = new Node(word[i]);
		if(i == 0){
			n.validWords.push(word);
		}
		n.parent = root;
		root.children.push(n);
		return this.insert(n, word, ++i);
	}
	//parse through all children and continue inserting if
	// current character is found as child
	var children = root.children;
	for(var j = 0; j < children.length; j++){
		var child = children[j];
		if(child.val == word[i]){
			if(i == 0){
				child.validWords.push(word);
			}
			return this.insert(child, word, ++i);
		}
	}
	//if current character is not found in children
	// add it as a new child
	var n = new Node(word[i]);
	if(i == 0){
		n.validWords.push(word);
	}
	n.parent = root;
	root.children.push(n);
	return this.insert(n, word, ++i);
}

Trie.prototype.printWords = function(root, str){
	if(root == null){
		return;
	}
	str += root.val;
	if(root.word){
		console.log(str.substr(2));
	}
	var children = root.children;
	for(var i = 0; i < children.length; i++){
		this.printWords(children[i], str);
	}
}

Trie.prototype.print = function(root){
	if(root == null){
		return;
	}
	console.log(root.val);
	var children = root.children;
	for(var i = 0; i < children.length; i++){
		this.print(children[i]);
	}
}

Trie.prototype.add = function(word){
	word = word.split("");
	if(this.root == null){
		var n = new Node(-1);
		this.root = n;
	}
	this.insert(this.root, word, 0);
}

Trie.prototype.search = function(root, pattern, i){
	if(i == pattern.length){
		return root;
	}
	var found = false;
	var children = root.children;
	for(var j = 0; j < children.length; j++){
		var child = children[j];
		if(child.val == pattern[i]){
			found = true;
			return this.search(child, pattern, ++i);
		}
	}
	if(!found){
		return null;
	}
}

Trie.prototype.getAllWordsFor = function(root, pattern, str, words){
	if(root == null){
		return;
	}
	str += root.val;
	if(root.word){
		words.push(pattern + str.substr(1));
	}
	var children = root.children;
	for(var i = 0; i < children.length; i++){
		return this.getAllWordsFor(children[i], pattern, str, words);
	}

	return words;
}


Trie.prototype.getWordsForPattern = function(root, searchPattern){
	pattern = searchPattern.split("");
	var patternRoot = this.search(root, pattern, 0);
	if(patternRoot == null){
		return [];
	}
	var words = this.getAllWordsFor(patternRoot, searchPattern, "", []);
	return words;
}

// var wordDic = new Trie();
// wordDic.add("time");
// wordDic.add("timestamp");
// wordDic.add("tinker");
// wordDic.add("<=");
// wordDic.add("<");
// console.log((wordDic.getWordsForPattern(wordDic.root, "tin")));
//wordDic.print(wordDic.root);
//wordDic.printWords(wordDic.root, "");