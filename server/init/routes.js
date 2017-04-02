import moment from 'moment';

const getFakeId = () => {
  return moment().format('hh:mm:ss D. MMMM YYYY');
};

export default (app, redisClient) => {
  app.post('/todos', (req, res) => {
    redisClient.select(2, () => {
      const id = getFakeId();
      redisClient.hmset(
        'todos',
        [id, ['todoTitle', req.body.todoTitle, 'id', id, 'todoContent', req.body.todoContent]],
        (err, result) => {
          if (result === 'OK') {
            redisClient.hmget('todos', id, (error, args) => {
              const dataFront = args[0].split(',');
              return setTimeout(() => {
                res.status(200).json({
                  id: dataFront[3],
                  todoTitle: dataFront[1],
                  todoContent: dataFront[5],
                });
              }, 500);
            });
          }
        }
      );
    });
  });
  app.put('/todos', (req, res) => {
    redisClient.select(2, () => {
      redisClient.hmset(
        'todos',
        [req.body.id, ['todoTitle', req.body.todoTitle, 'id', req.body.id, 'todoContent', req.body.todoContent]],
        (err, result) => {
          if (result === 'OK') {
            redisClient.hmget('todos', req.body.id, (error, args) => {
              const dataFront = args[0].split(',');
              return setTimeout(() => {
                res.status(200).json({
                  id: dataFront[3],
                  todoTitle: dataFront[1],
                  todoContent: dataFront[5],
                });
              }, 500);
            });
          }
        }
      );
    });
  });
  app.get('/todos', (req, res) => {
    redisClient.select(2, () => {
      redisClient.hgetall('todos', (error, args) => {
        if (!args) {
          return setTimeout(() => {
            res.status(200).json({todos: []});
          }, 1);
        }
        return setTimeout(() => {
          const respList = Object.keys(args).map((argIndex) => {
            const arg = args[argIndex];
            const dataFront = arg.split(',');
            return {
              id: dataFront[3],
              todoTitle: dataFront[1],
              todoContent: dataFront[5],
            };
          });
          res.status(200).json([...respList]);
        }, 1200);
      });
    });
  });
};
