create table user(
id int primary key auto_increment,
login varchar(40) not null unique,
password varchar(100) not null,
phot_url text not null
);

create table dialog(
id int primary key auto_increment,
first_user_id int not null,
second_user_id int not null,
CONSTRAINT fk_first_user FOREIGN KEY (first_user_id) REFERENCES user(id),
CONSTRAINT fk_second_user FOREIGN KEY (second_user_id) REFERENCES user(id)
);

create table dialog(
id int primary key auto_increment,
content text not null,
autor_id int not null,
chat_id int not null,
CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES user(id),
CONSTRAINT fk_chat FOREIGN KEY (chat_id) REFERENCES dialog(id)
);