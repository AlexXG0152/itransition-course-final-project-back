import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
  Scopes,
  Sequelize,
  Index,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IReviewCreateAttrs } from '../interfaces/reviewCreate.interface';
import { User } from 'src/app/users/entities/user.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { Comment } from 'src/app/comments/entities/comment.entity';
import { Category } from 'src/app/product/entities/category.entity';
import { Subcategory } from 'src/app/product/entities/subcategory.entity';
import { ReviewTag } from './review-tag.entity';
import { Tag } from './tag.entity';
import { Like } from './like.entity';

@Scopes(() => ({
  fullTextSearch: {
    where: Sequelize.literal('MATCH(title, content) AGAINST(:query)'),
  },
}))
@Table({ tableName: 'reviews', paranoid: true })
export class Review extends Model<Review, IReviewCreateAttrs> {
  @ApiProperty({ example: '1', description: 'Uniq review ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Review title',
    description: 'Review title ',
  })
  @Index({ type: 'FULLTEXT', name: 'title_content' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 1,
    },
  })
  title: string;

  @ApiProperty({
    example: 'Review content',
    description: 'Review content from 1 to 200 symbols',
  })
  @Index({ type: 'FULLTEXT', name: 'title_content' })
  @Column({
    type: DataType.TEXT('medium'),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [1, 16777215],
    },
  })
  content: string;

  @ApiProperty({
    example: 'Review images links (optional)',
    description: 'Review images links (optional) from 0 to 20 images',
  })
  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
  })
  imageslinks: string;

  @ApiProperty({
    example: 'Review author rating mark',
    description: 'Review author rating mark from 0 to 10',
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 0,
      max: 10,
    },
  })
  reviewRating: number;

  @ApiProperty({ example: 'Review likes', description: 'Review likes count' })
  @Index('like_index')
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      notNull: false,
      notEmpty: false,
      isInt: true,
      min: 0,
    },
  })
  like: number;

  @ApiProperty({ example: 'Review author ID', description: 'Review author ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  userId: number;

  @ApiProperty({
    example: 'Review product ID',
    description: 'Review product ID',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      notNull: false,
      notEmpty: false,
    },
  })
  productId: number;

  @ApiProperty({
    example: 'Review product name',
    description: 'Review product name',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  productTitle: string;

  @ApiProperty({
    example: 'Review Category ID',
    description: 'Review Category ID',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      notNull: false,
      notEmpty: false,
    },
  })
  categoryId: number;

  @ApiProperty({
    example: 'Review Subcategory ID',
    description: 'Review Subcategory ID',
  })
  @ForeignKey(() => Subcategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      notNull: false,
      notEmpty: false,
    },
  })
  subcategoryId: number;

  @BelongsToMany(() => Tag, () => ReviewTag)
  tags: Tag[];

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Category)
  categoryID: Category;

  @BelongsTo(() => Subcategory)
  subcategoryID: Subcategory;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  likes: Like[];
}
