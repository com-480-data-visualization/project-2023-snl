import csv

def create_country_dictionary(csv_file):
    country_dict = {}
    with open(csv_file, 'r') as file:
        reader = csv.reader(file, delimiter=',')
        next(reader)  # Skip header row if present
        
        for row in reader:
            country_name = row[0]
            country_code = row[1]
            # If the code doesn't exist, create a new list with the country name
            if country_code not in country_dict:
                country_dict[country_name] = country_code
    
    return country_dict

# Provide the path to your CSV file
csv_file_path = '../data/CountryCodes.csv'

# Call the function to create the dictionary
country_dictionary = create_country_dictionary(csv_file_path)

# Print the dictionary
print(country_dictionary)


