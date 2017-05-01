package open_data;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class CSVManipulator {
	
	public static void main(String[] args){
		readLongDescriptionsFromCSV();
	}

	private static void readLongDescriptionsFromCSV() {
		String csvFile = "KANTON_ZUERICH_abstimmungsarchiv_kanton.csv";
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";
		LinkedList<WordWithIds> wordList = new LinkedList<WordWithIds>();

		try {

			br = new BufferedReader(new InputStreamReader(new FileInputStream(csvFile), "UTF-8"));
			line = br.readLine();
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] lineData = line.split(cvsSplitBy);
				String description = lineData[3].replaceAll("[\"()«»/.0-9-]", "");
				String[] words = description.split(" ");
				int wordId = Integer.parseInt(lineData[1]);
				for(String word : words){
					if(!word.isEmpty() && ((word.length() >=6 && Character.isLowerCase(word.charAt(0))) || (word.length() >= 3 && Character.isUpperCase(word.charAt(0))))){
						Iterator<WordWithIds> iterator = wordList.iterator();
						boolean wordAdded = false;
						while(iterator.hasNext()){
							WordWithIds wordWithIds = iterator.next();
							if(wordWithIds.checkWord(word)){
								wordWithIds.addId(wordId);
								wordAdded = true;
								break;
							}
						}
						if(!wordAdded)
							wordList.add(new WordWithIds(word, wordId));
					}
				}
			}
			Collections.sort(wordList, new WordComparator());
			Iterator<WordWithIds> it = wordList.iterator();
			int count = 0;
			while(it.hasNext()){
				WordWithIds wordWith = it.next();
				if(wordWith.getCount() > 10){
					System.out.println(wordWith.getWord()+": "+wordWith.getCount());
					++count;
				}
			}
			System.out.println(count);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
