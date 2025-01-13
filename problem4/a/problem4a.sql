CREATE TABLE users_tb(
    id serial primary key not null,
    email varchar not null,
    username varchar not null,
    password varchar not null   
);

CREATE TABLE provinsi_tb(
    id serial  primary key not null,
    user_id int not null,
    nama varchar not null,
    diresmikan datetime,
    photo varchar,
    pulau varchar
);

CREATE TABLE kabupaten_tb(
    id serial primary key not null,
    nama varchar not null,
    diresmikan timestamp,
    photo varchar
)
g