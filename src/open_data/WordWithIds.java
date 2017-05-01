package open_data;

import java.util.LinkedList;

public class WordWithIds {
	private String word;
	private LinkedList<Integer> ids;
	
	public WordWithIds(String word, int id){
		this.word = word;
		this.ids = new LinkedList<Integer>();
		this.ids.add(id);
	}
	
	public WordWithIds(String word, int[] ids){
		this.word = word;
		this.ids = new LinkedList<Integer>();
		for(int id : ids){
			if(!this.ids.contains(id))
			this.ids.add(id);
		}
	}
	
	public String getWord(){
		return word;
	}
	
	public int getCount(){
		return ids.size();
	}
	
	public void addId(int id){
		if(!ids.contains(id))
			ids.add(id);
	}
	
	public boolean checkWord(String word){
		String word1 = this.word.toLowerCase();
		String word2 = word.toLowerCase();
		if(word1.equals(word2))
			return true;
		if(word2.contains(word1))
			return true;
		if(word1.contains(word2)){
			setNewWord(word);
			return true;
		}
		return false;
	}
	
	private void setNewWord(String word){
		System.out.println(this.word+" wird ersetzt durch: "+word);
		this.word = word;
	}

}
