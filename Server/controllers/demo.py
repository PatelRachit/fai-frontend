def get_all_users():
    users = [
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Doe", "email": "jane@example.com"}
    ]
    return users

def add_user(name, email):
    return {"message": f"User {name} added successfully!", "email": email}
