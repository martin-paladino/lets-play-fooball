# Let's play football

Frameworks:
- Django Rest Framework
- React

Instrucciones de instalación:
1. Clona el repositorio en tu computadora.
2. Crea y activa un entorno virtual para ejecutar el proyecto.
3. En la carpeta api, instala las dependencias listadas en requirements.txt con el siguiente comando:

    pip install -r requirements.txt

4. En la carpeta ui, instala las dependencias del frontend con el siguiente comando:

    npm install

5. Configura las variables de entorno en api/lets_play_football/settings.py para conectarse a la base de datos de PostgreSQL.

Instrucciones para correr la aplicación:
1. Activa el entorno virtual con el siguiente comando(en linux):
    source nombre_del_entorno/bin/activate
    Por ejemplo: source venv/bin/activate
2. Inicia el servidor de Django con el siguiente comando:
    cd api
    python manage.py runserver
3.  Inicia el servidor de React con el siguiente comando:
    cd ui
    npm start
    