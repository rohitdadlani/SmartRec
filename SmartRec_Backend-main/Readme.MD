## **📌 Overview**
This is a **Django REST API** for fetching, storing, and retrieving news articles. It integrates with external news sources like **NewsAPI** to fetch the latest news and stores them in **PostgreSQL**.

## **🚀 Features Implemented**
✔ **Fetch News Articles from NewsAPI**  
✔ **Store News Articles in PostgreSQL**  
✔ **Prevent Duplicate News** (Unique constraint on URLs)  
✔ **Fetch All News with Pagination & Filtering**  
✔ **Retrieve a Single News Article**  
✔ **Django REST Framework (DRF) API Endpoints**  

---

## **📂 Project Structure**
```
smartrec-backend/
│── smartrec_backend/       # Django project root
│   │── __init__.py
│   │── settings.py         # Django settings
│   │── urls.py             # Project-wide URLs
│   │── wsgi.py
│   │── asgi.py
│
│── news/                   # News API App
│   │── migrations/         # Django Migrations
│   │── __init__.py
│   │── admin.py            # Django Admin Config
│   │── models.py           # Database Schema (PostgreSQL)
│   │── serializers.py      # API Serialization (DRF)
│   │── views.py            # API Views
│   │── urls.py             # News API Endpoints
│
│── venv/                   # Virtual Environment (if used)
│── manage.py               # Django CLI
│── requirements.txt        # Project Dependencies
│── README.md               # Project Documentation
│── .gitignore              # Ignore Unnecessary Files
```

---

## **🛠 Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/smartrec-news-api.git
cd smartrec-news-api
```

### **2️⃣ Create & Activate Virtual Environment**
```sh
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

### **3️⃣ Install Dependencies**
```sh
pip install -r requirements.txt
```

### **4️⃣ Configure Database (PostgreSQL)**
Update `DATABASES` settings in **`settings.py`**:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### **5️⃣ Apply Migrations**
```sh
python manage.py migrate
```

### **6️⃣ Create a Superuser (Optional)**
```sh
python manage.py createsuperuser
```

### **7️⃣ Run the Server**
```sh
python manage.py runserver
```

---

## **📡 API Endpoints**
### **✅ Fetch All News**
```http
GET /api/news/
```
**Query Parameters:**  
- `page` (default: `1`)
- `page_size` (default: `10`)

---

### **✅ Fetch a Single News Article**
```http
GET /api/news/{id}/
```

---

### **✅ Fetch & Store News from External API**
```http
POST /api/news/fetch_news/
```
**Automatically fetches latest news and stores in the database.**

---

### **✅ Add a News Article (Manual)**
```http
POST /api/news/
```
**Request Body (JSON)**:
```json
{
    "title": "AI News Revolution",
    "category": "Technology",
    "source": "BBC",
    "published_at": "2025-03-11T20:34:37Z",
    "url": "https://example.com",
    "url_to_image": "https://example.com/image.jpg",
    "content": "Artificial Intelligence is transforming industries..."
}
```

---

### **✅ Delete a News Article**
```http
DELETE /api/news/{id}/
```

---

## **📊 Database Schema**
### **NewsArticle (PostgreSQL)**
| Column        | Type      | Description |
|--------------|----------|-------------|
| `id`         | AutoField | Primary Key |
| `title`      | TextField | Article Title |
| `category`   | TextField | News Category |
| `source`     | TextField | News Source |
| `author`     | TextField (nullable) | Author Name |
| `published_at` | DateTimeField | Published Date |
| `url`        | URLField (Unique) | News URL |
| `url_to_image` | URLField (nullable) | Thumbnail Image |
| `content`    | TextField | Full Article Content |

---

## **📜 Tech Stack**
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **API Integration:** NewsAPI
- **Deployment:** Gunicorn (optional)

---

## **💡 Next Steps**
- Implement **User Authentication**
- Implement **Search & Filtering**
- Deploy API to **AWS/GCP**
- Build **Frontend for News Display**

---

## **📌 Contributors**
- **[Your Name]** – *Lead Developer*

---

Let me know if you need any modifications! 🚀