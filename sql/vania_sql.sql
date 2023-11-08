create database chat;
create table user(
id int primary key auto_increment,
login varchar(40) not null unique,
password varchar(100)not null,
photo_url TEXT not null
);
create table dialog(
id INT PRIMARY KEY AUTO_INCREMENT,
 first_user_id INT NOT NULL,
 second_user_id INT NOT NULL,
 CONSTRAINT fk_first_user FOREIGN KEY (first_user_id) REFERENCES user(id),
 CONSTRAINT fk_second_user FOREIGN KEY (second_user_id) REFERENCES user(id)
 );
 create table message (
 id int primary key auto_increment,
 
 author_id int not null,
 dialog_id int not null,
 content text not null,
CONSTRAINT  fk_author_id FOREIGN KEY (author_id) REFERENCES user(id),
CONSTRAINT   fk_dialog_id FOREIGN KEY (dialog_id) REFERENCES dialog(id)
 );