create database trip
character set utf8 collate utf8_general_ci;
use trip;

create table user (
    iduser int not null auto_increment primary key,
    email text not null,
    passwords text not null,
    names text not null
) engine=myisam default charset=utf8;

insert into user (email, passwords, names)
values
('fifa@gmail.com', '12345678', 'จิรทิปต์ เกยูรธำมรงค์');

create table ticket (
    idticket int not null auto_increment primary key,
    trips text not null,
    amount int not null,
    names text not null
) engine=myisam default charset=utf8;

insert into ticket (trips, amount, names)
values
('Trip in Indonesia', 3, 'จิรทิปต์ เกยูรธำมรงค์'),
('Trip in France', 1, 'จิรทิปต์ เกยูรธำมรงค์');