import { Controller, Get, Post, Render, Response, Param } from '@nestjs/common';
import { AppService } from './app.service';
import express from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':param')
  //@Render('index')
  root(@Response() res, @Param('param') param: string) {
    return res.sendfile(join(__dirname, 'Client', 'index.html'));
  }
}
