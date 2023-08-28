import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../comments/entities/comment.entity';
import { Review } from '../reviews/entities/review.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentRepository: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return this.commentRepository.create(createCommentDto);
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      return this.commentRepository.findAll({ include: [Review] });
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number) {
    try {
      return this.commentRepository.findByPk(id, { include: [Review] });
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.commentRepository.update(updateCommentDto, {
        where: { id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number) {
    return this.commentRepository.destroy({ where: { id } });
  }
}
