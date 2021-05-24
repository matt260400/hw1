create table users(id integer primary key auto_increment,
username varchar(20) not null unique,
email varchar(255) not null unique,
password varchar(255) not null,
proPic varchar(255)) engine=innodb;

create table favouriteIDs (userID integer not null,
artistID varchar(255) not null,
index userIDs(userID),
FOREIGN KEY(userID) REFERENCES users(id) on update cascade,
PRIMARY KEY (userID, artistID)) engine=innodb;

INSERT into users(username, email, password, proPic) values
('Dwayne Johnson', 'mail@mail.it', '$2y$10$msiL/nqmMR22Dm7OBpjy.uFLCagmORnlxomgei2scBSo33QMhSnx2', 'https://i1.wp.com/www.rivistastudio.com/wp-content/uploads/2020/08/The-Rock-Jumanjii.jpg?fit=1200%2C800&ssl=1');
/*La password da inserire è Password1@*/

INSERT into favouriteIDs values('1', '0k17h0D3J5VfsdmQ1iZtE9');
INSERT into favouriteIDs values('1', '36QJpDe2go2KgaRleHCDTp');
INSERT into favouriteIDs values('1', '61r4cE4aoOD50wPNhQ5fF7');
INSERT into favouriteIDs values('1', '67ea9eGLXYMsO2eYQRui3w');
INSERT into favouriteIDs values('1', '5WoWlP0ihSFIxnppxjwSgE');
