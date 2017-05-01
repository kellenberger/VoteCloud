package open_data;

import java.util.Comparator;

public class WordComparator implements Comparator<WordWithIds> {

	@Override
	public int compare(WordWithIds word1, WordWithIds word2) {
		if(word1.getCount() < word2.getCount())
			return 1;
		else if(word1.getCount() > word2.getCount())
			return -1;
		else
			return 0;
	}

}
