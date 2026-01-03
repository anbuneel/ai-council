"""Encryption utilities for API key storage.

Uses MultiFernet for key rotation support:
- Multiple keys can be configured (comma-separated in API_KEY_ENCRYPTION_KEY)
- Newest key is listed first and used for all new encryptions
- Older keys are retained for decrypting existing data
- Enables zero-downtime key rotation
"""

from cryptography.fernet import Fernet, MultiFernet, InvalidToken

from .config import API_KEY_ENCRYPTION_KEYS


def _get_fernet() -> MultiFernet:
    """Get the MultiFernet instance for API key encryption.

    Returns MultiFernet configured with all available keys.
    The first key is used for encryption, all keys are tried for decryption.
    """
    if not API_KEY_ENCRYPTION_KEYS:
        raise ValueError(
            "API_KEY_ENCRYPTION_KEY not configured. "
            "Generate one with: python -c \"from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())\""
        )

    fernets = []
    for i, key in enumerate(API_KEY_ENCRYPTION_KEYS):
        try:
            fernets.append(Fernet(key.encode("utf-8")))
        except Exception as e:
            raise ValueError(f"Invalid Fernet key at position {i}: {e}")

    return MultiFernet(fernets)


def encrypt_api_key(api_key: str) -> str:
    """Encrypt an API key for storage.

    Uses the first (newest) key in the rotation list.
    """
    fernet = _get_fernet()
    return fernet.encrypt(api_key.encode("utf-8")).decode("utf-8")


def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt an API key from storage.

    Tries all keys in the rotation list until one succeeds.
    This allows old data encrypted with previous keys to still be decrypted.
    """
    fernet = _get_fernet()
    try:
        return fernet.decrypt(encrypted_key.encode("utf-8")).decode("utf-8")
    except InvalidToken:
        raise ValueError("Failed to decrypt API key - invalid token or key")


def rotate_api_key(encrypted_key: str) -> tuple[str, bool]:
    """Re-encrypt an API key with the current (newest) key.

    Returns:
        tuple: (new_encrypted_key, was_rotated)
        - new_encrypted_key: The re-encrypted key (or original if already current)
        - was_rotated: True if the key was re-encrypted, False if already using newest key

    This is useful for lazy re-encryption: when a user accesses their key,
    we can transparently upgrade it to the newest encryption key.
    """
    fernet = _get_fernet()
    try:
        # Decrypt with any available key
        decrypted = fernet.decrypt(encrypted_key.encode("utf-8"))

        # Re-encrypt with the primary (first/newest) key
        new_encrypted = fernet.encrypt(decrypted).decode("utf-8")

        # Check if it changed (different key was used)
        was_rotated = new_encrypted != encrypted_key

        return new_encrypted, was_rotated
    except InvalidToken:
        raise ValueError("Failed to rotate API key - invalid token or key")


def get_key_hint(api_key: str) -> str:
    """Get a hint for displaying the API key.

    Shows the last 6 characters for user identification.
    """
    if len(api_key) > 6:
        return f"...{api_key[-6:]}"
    return api_key


def get_key_count() -> int:
    """Get the number of encryption keys configured.

    Useful for diagnostics and rotation status checks.
    """
    return len(API_KEY_ENCRYPTION_KEYS)
