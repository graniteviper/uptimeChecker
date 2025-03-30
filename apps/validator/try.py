import base64

# The given string
input_string = ""

# Decode the string from base64 to bytes
decoded_bytes = base64.b64decode(input_string)

# Convert decoded bytes to a list of uint8 values (each byte is in the range 0-255)
uint8_values = list(decoded_bytes)

# Print the list of uint8 values
print(uint8_values)