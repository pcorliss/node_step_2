XSS Vulnerability Example Apps
==============================

This is the Node/Socket.io example for a set of example applications vulnerable to XSS.

Related Apps
------------
* Admin - https://github.com/pcorliss/vuln_admin
* Sinatra - https://github.com/pcorliss/sinatra_step_1
* Rails - https://github.com/pcorliss/rails_step_3
* Node - https://github.com/pcorliss/node_step_2

Live Demo
---------
You can visit a live demo at http://vuln.alttab.org

Local Development
=================

```
git clone https://github.com/pcorliss/node_step_2.git
cd node_step_2
npm install
foreman start
```

Heroku Deployment
=================

```
heroku create
heroku labs:enable websockets
heroku addons:add memcachier:dev
git push heroku master
heroku ps:scale web=1
```
