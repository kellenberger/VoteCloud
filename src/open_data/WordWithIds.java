package open_data;

import java.util.Iterator;
import java.util.LinkedList;

public class WordWithIds {
	private String word;
	private LinkedList<Integer> ids;
	
	public WordWithIds(String word, int id){
		this.word = word;
		this.ids = new LinkedList<Integer>();
		this.ids.add(id);
	}
	
	public WordWithIds(String word, LinkedList<Integer> ids){
		this.word = word;
		this.ids = new LinkedList<Integer>();
		this.ids.addAll(ids);
	}
	
	public String getWord(){
		return this.word;
	}
	
	public LinkedList<Integer> getIds(){
		return this.ids;
	}
	
	public int getCount(){
		return ids.size();
	}
	
	private void addId(int id){
		if(!ids.contains(id))
			ids.add(id);
	}
	
	public void addIds(LinkedList<Integer> ids){
		Iterator<Integer> it = ids.iterator();
		while(it.hasNext()){
			int id = it.next();
			if(!this.ids.contains(id))
				this.ids.add(id);
		}
	}
	
	public WordWithIds checkWord(String word, int id){
		String word1 = this.word.toLowerCase();
		String word2 = word.toLowerCase();
		if(word1.equals(word2)){
			addId(id);
			return this;
		}
		if(word2.contains(word1)){
			addId(id);
			if(word2.length() - word1.length() <= 2 && word1.charAt(0) == word2.charAt(0)){
				return this;
			} else {
				return new WordWithIds(word, id);
			}
		}
		if(word1.contains(word2)){
			if(word1.length() - word2.length() <= 2 && word1.charAt(0) == word2.charAt(0)){
				setNewWord(word);
				return this;
			} else {
				LinkedList <Integer> new_ids = new LinkedList<Integer>();
				new_ids.addAll(this.ids);
				if(!new_ids.contains(id))
					new_ids.add(id);
				return new WordWithIds(word, new_ids);
			}
		}
		return null;
	}
	
	private void setNewWord(String word){
		System.out.println(this.word+" wird ersetzt durch: "+word);
		this.word = word;
	}
	
	public boolean isWordSimilar(String word){
		String word1 = word.toLowerCase();
		String word2 = this.word.toLowerCase();
		if(word1.contains(word2) && word1.length() - word2.length() <= 2 && word1.charAt(0) == word2.charAt(0))
			return true;
		return false;
	}

}
