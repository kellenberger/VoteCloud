package open_data;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class CSVManipulator {
	
	public static void main(String[] args){
		readLongDescriptionsFromCSV();
	}

	private static void readLongDescriptionsFromCSV() {
		String csvFile = "KANTON_ZUERICH_abstimmungsarchiv_kanton.csv";
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";

		try {

			br = new BufferedReader(new FileReader(csvFile));
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] lineData = line.split(cvsSplitBy);
				String description = lineData[3].replaceAll("[\"()»]", "");
				String[] words = description.split(" ");
				for(String word : words){
					if(!word.isEmpty() && Character.isUpperCase(word.charAt(0)))
						System.out.print(word+" ");
				}
				System.out.println("");

			}

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
