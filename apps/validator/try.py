import base58

# Example base-58 encoded secret key
base58_encoded_secret_key = '24opo1CNjThUhk7vQtAppaF7B31drZkT7Mt2g2wqXkmegi4iwWxnjFT7SLADuoiwzHQSGCuxXnhcHNV2wvyXKt6A'

# Decode the base-58 encoded secret key
decoded_secret_key = base58.b58decode(base58_encoded_secret_key)

# Convert the decoded secret key to a list of integers
secret_key_bytes = list(decoded_secret_key)

# Print the 64-byte secret key
print(secret_key_bytes)

# import base58
# import base64

# def is_base58(key):
#     try:
#         base58.b58decode(key)
#         return True
#     except ValueError:
#         return False

# def is_base64(key):
#     try:
#         base64.b64decode(key)
#         return True
#     except (binascii.Error, TypeError):
#         return False

# def check_key_encoding(key):
#     if is_base58(key):
#         return "Base58"
#     elif is_base64(key):
#         return "Base64"
#     else:
#         return "Unknown"

# # Example usage
# key = "24opo1CNjThUhk7vQtAppaF7B31drZkT7Mt2g2wqXkmegi4iwWxnjFT7SLADuoiwzHQSGCuxXnhcHNV2wvyXKt6A"  # Example Base58 key
# print(f"The key '{key}' is encoded in: {check_key_encoding(key)}")
