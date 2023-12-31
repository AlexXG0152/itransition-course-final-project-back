import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Like } from './entities/like.entity';
import { Category } from '../product/entities/category.entity';
import { Subcategory } from '../product/entities/subcategory.entity';
import { Tag } from './entities/tag.entity';
import { ReviewTag } from './entities/review-tag.entity';
import { Comment } from '../comments/entities/comment.entity';
import { FullTextSearchService } from './full-text-search.service';
import { LikesService } from './likes.service';
import { TagsService } from './tags.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, FullTextSearchService, LikesService, TagsService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Review,
      Product,
      Like,
      Tag,
      ReviewTag,
      Category,
      Subcategory,
      Comment,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [ReviewsService, FullTextSearchService, LikesService, TagsService],
})
export class ReviewsModule {}
