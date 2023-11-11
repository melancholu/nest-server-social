import { Test } from '@nestjs/testing';
import { User, UserRepository, USER_REPOSITORY } from 'src/domain/user';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: UserRepository;

  const user: User = new User({
    uuid: '1',
    name: 'test_user',
    email: 'test@gmail.com',
    imageUrl: '',
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useValue: {
            getList: jest.fn(),
            getOneByUuid: jest.fn(),
            save: jest.fn(),
          },
        },
        UserController,
        UserService,
      ],
    }).compile();

    userController = module.get(UserController);
    userRepository = module.get(USER_REPOSITORY);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('get user list', () => {
    it('succeed', async () => {
      const getList = jest
        .spyOn(userRepository, 'getList')
        .mockResolvedValue([user]);

      const result = await userController.getList(1);
      expect(result).toEqual({
        data: [
          {
            email: 'test@gmail.com',
            imageUrl: '',
            name: 'test_user',
            uuid: '1',
          },
        ],
        meta: {
          cur_page: 1,
          next_page: 2,
          page_num: 10,
        },
      });
      expect(getList).toBeCalledTimes(1);
    });
  });

  describe('get me', () => {
    it('succeed', async () => {
      const getOneByUuid = jest
        .spyOn(userRepository, 'getOneByUuid')
        .mockResolvedValue(user);

      const result = await userController.getMe({
        user: { uuid: '1' },
      });
      expect(result).toEqual({
        email: 'test@gmail.com',
        imageUrl: '',
        name: 'test_user',
        uuid: '1',
      });
      expect(getOneByUuid).toBeCalledTimes(1);
    });
  });

  describe('get one', () => {
    it('succeed', async () => {
      const getOneByUuid = jest
        .spyOn(userRepository, 'getOneByUuid')
        .mockResolvedValue(user);

      const result = await userController.getOne('1');
      expect(result).toEqual({
        email: 'test@gmail.com',
        imageUrl: '',
        name: 'test_user',
        uuid: '1',
      });
      expect(getOneByUuid).toBeCalledTimes(1);
    });
  });

  describe('save user', () => {
    it('succeed', async () => {
      const userToSave = {
        name: 'test_user',
        email: 'test@gmail.com',
        password: 'testpassword',
      } as User;
      const save = jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userController.save(userToSave);
      expect(result).toEqual({
        uuid: '1',
        name: 'test_user',
        email: 'test@gmail.com',
        imageUrl: '',
      });
      expect(save).toBeCalledTimes(1);
    });
  });
});
