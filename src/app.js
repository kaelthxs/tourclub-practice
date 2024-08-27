
/*
Программа server.js
Лабораторная работа №1 по профессиональному модулю МДК 02.01 Технология
разработки программного обеспечения
Тема "Структурная схема программы по туристическому клубу"
Язык: JavaScript (Node.js)
Разработал: Нерубащенко Владислав Александрович, ТИП-42
Дата: 21.06.2024
ЗАДАНИЕ и ожидаемые входные данные:
Создание REST API для взаимодействия с базой данных PostgreSQL, включая 
операции создания, чтения, обновления и удаления (CRUD) для различных сущностей.
Ожидаемые входные данные: запросы от клиента в формате JSON/вывод запросов в клиентскую часть.
Переменные, используемые в программе:
- express: фреймворк для создания сервера Node.js
- bodyParser: middleware для парсинга тела HTTP-запросов
- cors: middleware для разрешения CORS-запросов
- client: клиент для взаимодействия с базой данных PostgreSQL
Процедуры, используемые в программе:
- app.use(): подключение middleware
- app.get(): обработка GET-запросов
- app.post(): обработка POST-запросов
- client.query(): выполнение SQL-запросов к базе данных

░█████╗░░█████╗░░█████╗░  ░██████╗░██╗░░░░░███████╗██████╗░██╗░░░██╗░██████╗
██╔══██╗██╔══██╗██╔══██╗  ██╔════╝░██║░░░░░██╔════╝██╔══██╗██║░░░██║██╔════╝
██║░░██║██║░░██║██║░░██║  ██║░░██╗░██║░░░░░█████╗░░██████╦╝██║░░░██║╚█████╗░
██║░░██║██║░░██║██║░░██║  ██║░░╚██╗██║░░░░░██╔══╝░░██╔══██╗██║░░░██║░╚═══██╗
╚█████╔╝╚█████╔╝╚█████╔╝  ╚██████╔╝███████╗███████╗██████╦╝╚██████╔╝██████╔╝
░╚════╝░░╚════╝░░╚════╝░  ░╚═════╝░╚══════╝╚══════╝╚═════╝░░╚═════╝░╚═════╝░

Процедура инициализации клиента PostgreSQL
Формальные параметры:
- user: имя пользователя базы данных
- host: хост базы данных
- database: имя базы данных
- password: пароль пользователя базы данных
- port: порт подключения к базе данных

app.get("/", (req, res)
Процедура для обработки GET-запроса на корневой маршрут
Формальные параметры:
- req: объект запроса
- res: объект ответа
Возвращаемое значение:
- JSON-ответ с приветственным сообщением

app.post('/updateUser/:id', (req, res)
Процедура для обработки POST-запроса на обновление данных пользователя
Формальные параметры:
- req: объект запроса
- res: объект ответа
- id: идентификатор пользователя (параметр маршрута)
- name, surname, email, phone_number, role, age, instructor: данные пользователя для обновления
Возвращаемое значение:
- JSON-ответ с сообщением об успешном или неуспешном обновлении данных

app.post('/updateTourist/:id', (req, res)
Процедура для обработки POST-запроса на обновление данных туриста
Формальные параметры:
- req: объект запроса
- res: объект ответа
- id: идентификатор туриста (параметр маршрута)
- name, surname, user_id, most_difficult_hike, experience, physics: данные туриста для обновления
Возвращаемое значение:
- JSON-ответ с сообщением об успешном или неуспешном обновлении данных

Аналогичные процедуры для coach, competition, section, schedule, groupss, route, hike, journal

app.get('/users/:id', (req, res)
Процедура для обработки GET-запроса на удаление пользователя
Формальные параметры:
- req: объект запроса
- res: объект ответа
- id: идентификатор пользователя (параметр маршрута)
Возвращаемое значение:
- JSON-ответ с сообщением об успешном или неуспешном удалении данных

Аналогичные процедуры для удаления tourist, coach, competition, section, schedule, groupss, route, hike, journal

app.get('/getUsers', (req, res)
Процедура для обработки GET-запроса на получение данных пользователей
Формальные параметры:
- req: объект запроса
- res: объект ответа
Возвращаемое значение:
- JSON-ответ с данными пользователей

Аналогичные процедуры для получения данных tourist, coach, competition, section, schedule, groupss, route, hike, journal

app.post('/addUsers', (req, res)
Процедура для обработки POST-запроса на добавление пользователя
Формальные параметры:
- req: объект запроса
- res: объект ответа
- name, surname, email, phone_number, role, age, instructor: данные пользователя для добавления
Возвращаемое значение:
- JSON-ответ с сообщением об успешном или неуспешном добавлении данных

Аналогичные процедуры для добавления данных tourist, coach, competition, section, schedule, groupss, route, hike
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const { Client } = require('pg');

const app = express();

const client = new Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'tourclub_practice',
    password: 'postgres',
    port: 5432,
})

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message:"Welcome to Tourclub app."});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.`);
});

client.connect();

app.post('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const { name, surname, email, phone_number, role, age, instructor } = req.body;
    const query = `UPDATE users SET name = $1, surname = $2, email = $3, phone_number = $4, role = $5, age = $6, instructor = $7 WHERE id = $8;`;
    client.query(query, [name, surname, email, phone_number, role, age, instructor, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateTourist/:id', (req, res) => {
    const id = req.params.id;
    const { name, surname, user_id, most_difficult_hike, experience, physics } = req.body;
    const query = `UPDATE tourist SET name = $1, surname = $2, user_id = $3, most_difficult_hike = $4, experience = $5, physics = $6 WHERE id = $7;`;
    client.query(query, [name, surname, user_id, most_difficult_hike, experience, physics, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateCoach/:id', (req, res) => {
    const id = req.params.id;
    const { name, surname, user_id, most_difficult_hike, section, load_hours, physics } = req.body;
    const query = `UPDATE coach SET name = $1, surname = $2, user_id = $3, most_difficult_hike = $4, section = $5, load_hours = $6, physics = $7 WHERE id = $8;`;
    client.query(query, [name, surname, user_id, most_difficult_hike, section, load_hours, physics, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateCompetition/:id', (req, res) => {
    const id = req.params.id;
    const { winner, date_of_competition } = req.body;
    const query = `UPDATE competition SET winner = $1, date_of_competition = $2 WHERE id = $3;`;
    client.query(query, [winner, date_of_competition, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateSection/:id', (req, res) => {
    const id = req.params.id;
    const { chief_id, name } = req.body;
    const query = `UPDATE section SET chief_id = $1, name = $2 WHERE id = $3;`;
    client.query(query, [chief_id, name, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateSchedule/:id', (req, res) => {
    const id = req.params.id;
    const { section_id, training_type, schedul_date } = req.body;
    const query = `UPDATE Schedule SET section_id = $1, training_type = $2, schedul_date = $3 WHERE id = $4;`;
    client.query(query, [section_id, training_type, schedul_date, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateGroupss/:id', (req, res) => {
    const id = req.params.id;
    const { section_id, coach_id } = req.body;
    const query = `UPDATE groupss SET section_id = $1, coach_id = $2 WHERE id = $3;`;
    client.query(query, [section_id, coach_id, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 

  });

  app.post('/updateRoute/:id', (req, res) => {
    const id = req.params.id;
    const { spot_of_beginning, spot_of_finish, the_presence_of_reservoirs, the_presence_of_mountains } = req.body;
    const query = `UPDATE route SET spot_of_beginning = $1, spot_of_finish = $2, the_presence_of_reservoirs = $3, the_presence_of_mountains = $4 WHERE id = $5;`;
    client.query(query, [spot_of_beginning, spot_of_finish, the_presence_of_reservoirs, the_presence_of_mountains, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 
  });

  app.post('/updateHike/:id', (req, res) => {
    const id = req.params.id;
    const { date_of_beginning, date_of_finish, plan, difficult, type, instructor_id, route_id } = req.body;
    const query = `UPDATE hike SET date_of_beginning = $1, date_of_finish = $2, plan = $3, difficult = $4, type = $5, instructor_id = $6, route_id = $7 WHERE id = $8;`;
    client.query(query, [date_of_beginning, date_of_finish, plan, difficult, type, instructor_id, route_id, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 
  });

  app.post('/updateJournal/:id', (req, res) => {
    const id = req.params.id;
    const { date_of_hike, description, hike_id } = req.body;
    const query = `UPDATE journal SET date_of_hike = $1, description = $2, hike_id = $3 WHERE id = $4;`;
    client.query(query, [date_of_hike, description, hike_id, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
    }); 
  });
  
app.get('/users/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/tourist/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM tourist WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/coach/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM coach WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/competition/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM competition WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/section/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM section WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/schedule/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM schedule WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/groupss/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM groupss WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/route/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM route WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });
  
  app.get('/hike/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM hike WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

  app.get('/journal/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    const id = req.params.id;
    
    client.query('DELETE FROM journal WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting data' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    });
  });

app.get('/getUsers', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM users', (err, results, fields) => {

    if (err) throw error;
        const user = {
            message:results
        }
        res.json(user);
    });
    });

app.get('/getTourist', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM tourist', (err, results, fields) => {

    if (err) throw error;
        const tourist = {
            message:results
        }
        res.json(tourist);
    });
    });
    
app.get('/getCoach', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM coach', (err, results, fields) => {

    if (err) throw error;
        const coach = {
            message:results
        }
        res.json(coach);
    });
    });

app.get('/getCompetition', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM competition', (err, results, fields) => {

    if (err) throw error;
        const competition = {
            message:results
        }
        res.json(competition);
    });
    });

app.get('/getSection', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM section', (err, results, fields) => {

    if (err) throw error;
        const section = {
            message:results
        }
        res.json(section);
    });
    });

app.get('/getSchedule', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM schedule', (err, results, fields) => {

    if (err) throw error;
        const schedule = {
            message:results
        }
        res.json(schedule);
    });
    });

app.get('/getGroupss', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM groupss', (err, results, fields) => {

    if (err) throw error;
        const groupss = {
            message:results
        }
        res.json(groupss);
    });
    });

app.get('/getRoute', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM route', (err, results, fields) => {

    if (err) throw error;
        const route = {
            message:results
        }
        res.json(route);
    });
    });

app.get('/getHike', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM hike', (err, results, fields) => {

    if (err) throw error;
        const hike = {
            message:results
        }
        res.json(hike);
    });
    });

app.get('/getJournal', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    client.query('SELECT * FROM journal', (err, results, fields) => {

    if (err) throw error;
        const journal = {
            message:results
        }
        res.json(journal);
    });
    });


app.post('/addUsers', (req, res) => {
    const {name, surname, email, phone_number, role, age, instructor} = req.body;

    const query = 'INSERT INTO users (name, surname, email, phone_number, role, age, instructor) VALUES ($1, $2, $3, $4, $5, $6, $7);';

    client.query(query, [name, surname, email, phone_number, role, age, instructor], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addTourist', (req, res) => {
    const {name, surname, user_id, most_difficult_hike, experience, physics} = req.body;

    const query = 'INSERT INTO tourist (name, surname, user_id, most_difficult_hike, experience, physics) VALUES ($1, $2, $3, $4, $5, $6);';

    client.query(query, [name, surname, user_id, most_difficult_hike, experience, physics], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addCoach', (req, res) => {
    const {name, surname, user_id, most_difficult_hike, section, load_hours, physics} = req.body;

    const query = 'insert into coach (name, surname, user_id, most_difficult_hike, section, load_hours, physics) VALUES ($1, $2, $3, $4, $5, $6, $7);';

    client.query(query, [name, surname, user_id, most_difficult_hike, section, load_hours, physics], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addCompetition', (req, res) => {
    const {winner, date_of_competition} = req.body;
    const query = 'insert into competition (winner, date_of_competition) VALUES ($1, $2);';
    client.query(query, [winner, date_of_competition], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addSection', (req, res) => {
    const {chief_id, name} = req.body;
    const query = 'insert into section (chief_id, name) VALUES ($1, $2);';
    client.query(query, [chief_id, name], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addSchedule', (req, res) => {
    const {section_id, training_type, schedul_date} = req.body;

    const query = 'insert into schedule (section_id, training_type, schedul_date) VALUES ($1, $2, $3);';

    client.query(query, [section_id, training_type, schedul_date], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addGroupss', (req, res) => {
    const {section_id, coach_id} = req.body;

    const query = 'insert into groupss (section_id, coach_id) VALUES ($1, $2);';

    client.query(query, [section_id, coach_id], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addRoute', (req, res) => {
    const {spot_of_beginning, spot_of_finish, the_presence_of_reservoirs, the_presence_of_mountains} = req.body;

    const query = 'insert into route (spot_of_beginning, spot_of_finish, the_presence_of_reservoirs, the_presence_of_mountains) VALUES ($1, $2, $3, $4);';

    client.query(query, [spot_of_beginning, spot_of_finish, the_presence_of_reservoirs, the_presence_of_mountains], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addHike', (req, res) => {
    const {date_of_beginning, date_of_finish, plan, difficult, type, instructor_id, route_id} = req.body;

    const query = 'insert into hike (date_of_beginning, date_of_finish, plan, difficult, type, instructor_id, route_id) VALUES ($1, $2, $3, $4, $5, $6, $7);';

    client.query(query, [date_of_beginning, date_of_finish, plan, difficult, type, instructor_id, route_id], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});

app.post('/addJournal', (req, res) => {
    const {date_of_hike, description, hike_id} = req.body;

    const query = 'insert into journal (date_of_hike, description, hike_id) VALUES ($1, $2, $3);';

    client.query(query, [date_of_hike, description, hike_id], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding data' });
          } else {
            res.status(200).json({ message: 'Data added successfully' });
          }
});
});
