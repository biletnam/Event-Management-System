var express = require('express');


var routes = function () {
    storyRouter.route('/Mystories')
        .post(function (req, res) {
            values = {
                story_id: req.body.story_id,
                slug: req.body.slug,
                genre: req.body.genre,
                content: req.body.content,
                created_by: req.body.created_by
            };
            console.log(values);
            var query2 = 'insert into stories SET ?';
            connection.query(query2, values,
                function (err, rows, fields) {
                    if (err) {

                        console.log(err);
                        res.status(500).message(err);

                    } else {
                        res.json(fields);
                    }
                });
        })
        .get(function (req, res) {
            connection.query('select * from stories WHERE created_by="Special_User"', function (err, rows, fields) {
                if (err)
                    res.status(500).message(err);
                res.json(rows);
            });
        })
        .put(function (req, res) {
            values = [req.body.story_id, req.body.slug, req.body.genre, req.body.content, req.body.created_by];
            var query2 = 'insert into stories (story_id,slug, genre,content,created_by) VALUES ?';
            connection.query(query2, values,
                function (err, rows, fields) {
                    if (err)
                        res.status(500).message(err);
                });

        })




    storyRouter.route('/Otherstories')
        .get(function (req, res) {
            connection.query('select * from stories where created_by<>"Special_User"', function (err, rows, fields) {
                if (err)
                    res.status(500).message(err);
                res.json(rows);
            });
        });

    storyRouter.route('/Otherstories/:id')
        .get(function (req, res) {

            values = [req.params.id];
            var query1 = 'select * from stories where story_id = ?';
            connection.query(query1, values,
                function (err, rows, fields) {
                    if (err)
                        res.status(500).message(err);
                    res.json(rows);
                });
        });
    storyRouter.route('/Mystories/:id')
        .post(function (req, res) {
            values = [req.body.story_id, req.body.slug, req.body.genre, req.body.content, req.body.created_by];
            var query2 = 'insert into stories (story_id,slug, genre,content,created_by) VALUES ?';
            connection.query(query2, values,
                function (err, rows, fields) {
                    if (err)
                        res.status(500).message(err);
                });

        })
        .get(function (req, res) {

            values = [req.params.id];
            var query1 = 'select * from stories where story_id = ?';
            connection.query(query1, values,
                function (err, rows, fields) {
                    if (err)
                        res.status(500).message(err);
                    res.json(rows);
                });
        });
    return storyRouter;

};
module.exports = routes;