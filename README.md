## Url Shortener Frontend

[![Web](https://img.shields.io/badge/Frondend-deployed-green)](https://url.ronsong.live/all)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ronniesong0809/url-shortener-react/blob/master/LICENSE)

Copyright (c) 2022 Ronnie Song

An internal service for shortening URLs that keep track of quickly referenced internal tools, wiki pages, and external resources

- Frontend: [Live demo](https://url.ronsong.live/), [repository](https://github.com/ronniesong0809/url-shortener-react)

- Backend: [Live demo](http://shorturl.ronsong.live/all), [repository](https://github.com/ronniesong0809/url-shortener)

## Requirements and Features

- Design RESTful API with analytics of usage

- Short links are randomly generated, no duplicate URLs are allowed to be created

- Short links can expire at a future time, or can live forever (TTL)

- Short links can be deleted, if a short link is created that was once deleted, it will have no "knowledge" of its previous version

## Tech Stack and Tools
React, React-router-dom, Axios, Ant Design UI, Dayjs, and more

## Backend Repository

To check the API backend repository, go to [github.com/ronniesong0809/url-shortener](https://github.com/ronniesong0809/url-shortener)

## API Documentation

To check the API documentation which is automatically generated using express-oas-generator, go to [shorturl.ronsong.live/api/docs](https://shorturl.ronsong.live/api/docs/v3/)

## Setup

Fork/clone this repo, then download and install packages/dependencies

```
$ git clone git@github.com:ronniesong0809/url-shortener-react.git
$ cd url-shortener
$ npm install
```

Copy the `.env.example` to `.env`, and replace any entries in `.env` with your own values

Start the server by running `npm start`. or `npm build` for production


## License
This program is licensed under the "MIT License". Please see the file LICENSE in the source distribution of this software for license terms.