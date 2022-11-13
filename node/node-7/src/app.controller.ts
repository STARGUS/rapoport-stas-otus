import { Controller, Get, Post, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';
import express from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@Render('index')
  root(@Response() res) {
   return res.sendfile(join(__dirname, 'Client', 'index.html'));
  }
}
