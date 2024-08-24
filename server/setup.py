from setuptools import setup, find_packages

setup(
    name='server',  
    version='0.1.0',           
    packages=find_packages(),  
    include_package_data=True,
    install_requires=[
        'Flask',
        'Flask-SQLAlchemy',
        'Flask-Migrate',
        'Flask-Cors',
        'psycopg2-binary',  
       
    ],
    entry_points={
        'console_scripts': [
            'runserver = run:main',  
        ],
    })  