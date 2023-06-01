import csv
from country_code import country_code


def check_key_substring(dictionary, substring):
    for key, value in dictionary.items():
        if substring in key:
            return value
    return 0 

def add_column_to_csv(input_file, output_file, new_column_name):
    with open(input_file, 'r') as file:
        reader = csv.reader(file)
        headers = next(reader)  # Read the header row
        
        # Add the new column name to the header row
        headers.append(new_column_name)

        # Prepare the data for the new column
        rows = []
        for row in reader:
            # Add the new column data to each row
            try:
                value = country_code[row[0]]
            except:
                value = check_key_substring(country_code, row[0])
            new_column_data = value
            row.append(new_column_data)

            # Append the updated row to the list of rows
            rows.append(row)

    # Write the new CSV file with the added column
    with open(output_file, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)  # Write the updated header row
        writer.writerows(rows)  # Write the updated rows

input_csv_file = '../data/co2-per-unit-energy.csv'

output_csv_file = '../data/co2-per-unit-energy_with_country_code.csv'

# Provide the name and data for the new column
new_column_name = 'Country_Code'

# Call the function to add the new column to the CSV file
add_column_to_csv(input_csv_file, output_csv_file, new_column_name)

print("New column added successfully!")


