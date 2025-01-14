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

ALTER TABLE kabupaten_tb ADD COLUMN provinsi_id int not null;

ALTER TABLE provinsi_tb ALTER COLUMN diresmikan SET DATA TYPE DATE;

ALTER TABLE kabupaten_tb ALTER COLUMN diresmikan SET DATA TYPE DATE;

INSERT INTO 
    provinsi_tb(user_id, nama, diresmikan, photo, pulau)
VALUES
    (1, 'Aceh', '7-12-1956', 'logo-Aceh.png', 'Sumatra'),
    (1, 'Sumatra Utara', '15-4-1948', 'logo-Sumut.png', 'Sumatra'),
    (1, 'Sumatra Barat', '1-7-1958', 'logo-Sumbar.png', 'Sumatra'),
    (1, 'Riau', '9-8-1957', 'logo-Riau.png', 'Sumatra'),
    (1, 'Jambi', '6-1-1957', 'logo-Jambi.png', 'Sumatra'),
    (1, 'Sumatra Selatan', '12-9-1950', 'logo-Sumsel.png', 'Sumatra'),
    (1, 'Bengkulu', '18-11-1968', 'logo-Bengkulu.png', 'Sumatra'),
    (1, 'Lampung', '10-3-1964', 'logo-Lampung.png', 'Sumatra'),
    (1, 'Kepulauan Bangka Belitung', '21-11-2000', 'logo-Babel.png', 'Sumatra'),
    (1, 'Kepulauan Riau', '24-9-2002', 'logo-Riau.png', 'Sumatra'),
    (1, 'DKI Jakarta', '28-8-1961', 'logo-Jakarta.png', 'Jawa'),
    (1, 'Jawa Barat', '19-8-1945', 'logo-Jabar.png', 'Jawa'),
    (1, 'Jawa Tengah', '15-8-1950', 'logo-Jateng.png', 'Jawa'),
    (1, 'Jawa Timur', '12-8-1950', 'logo-Jatim.png', 'Jawa'),
    (1, 'DI Yogyakarta', '4-3-1950', 'logo-Yogyakarta.png', 'Jawa');    


INSERT INTO 
    kabupaten_tb(nama, diresmikan, photo, provinsi_id)
VALUES  
    ('Banda Aceh', '22-1-1957', 'banda-aceh.png', 1),
    ('Medan', '1-4-1948', 'medan.png', 2),
    ('Padang', '1-7-1958', 'padang.png', 3),
    ('Pekanbaru', '9-8-1957', 'pekanbaru.png', 4),
    ('Jambi', '6-1-1957', 'jambi.png', 5),
    ('Palembang', '12-9-1950', 'palembang.png', 6),
    ('Bengkulu', '18-11-1968', 'bengkulu.png', 7),
    ('Bandar Lampung', '18-4-1964', 'bandar-lampung.png', 8),
    ('Pangkal Pinang', '21-11-2000', 'pangkal-pinang.png', 9),
    ('Tanjung Pinang','24-9-2002', 'tanjung-pinang.png', 10),
    ('Jakarta', '28-8-1961', 'jakarta.png', 11),
    ('Bandung', '19-8-1961', 'bandung.png',12),
    ('Semarang', '15-8-1950', 'semarang.png', 13),
    ('Surabaya', '12-8-1950', 'surabaya.png', 14),
    ('Yogyakarta', '4-3-1950', 'yogyakarta.png', 15);


--- SELECT ALL PROVINSI
SELECT * FROM provinsi_tb;

--- SELECT provinsi with kabupaten
SELECT p.nama as provinsi, p.diresmikan as provinsi_diresmikan, p.photo as provinsi_photo, k.nama as kabupaten, k.diresmikan as kabupaten_diresmikan, k.photo as kabupaten_photo FROM provinsi_tb p INNER JOIN kabupaten_tb k ON p.id=k.provinsi_id;

---- SELECT by pulau
SELECT * FROM provinsi_tb WHERE pulau = 'Sumatra';
SELECT * FROM provinsi_tb WHERE pulau = 'Jawa';