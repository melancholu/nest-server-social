import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { User, UserRepository, USER_REPOSITORY } from 'src/domain/user';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const user: User = new User({
    uuid: '1',
    name: 'test_user',
    email: 'test@gmail.com',
    imageUrl: '',
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        {
          provide: USER_REPOSITORY,
          useValue: {
            getList: jest.fn(),
            getOneByUuid: jest.fn(),
            save: jest.fn(),
          },
        },
        UserService,
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(USER_REPOSITORY);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('save user', () => {
    it('succeed', async () => {
      const userToSave = {
        name: 'test_user',
        email: 'test@gmail.com',
        password: 'testpassword',
      } as User;
      const save = jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userService.save(userToSave);
      expect(result).toEqual({
        uuid: '1',
        name: 'test_user',
        email: 'test@gmail.com',
        imageUrl: '',
      });
      expect(save).toBeCalledTimes(1);
    });
  });

  describe('get user by uuid', () => {
    it('succeed', async () => {
      const uuid = '1';
      const getOneByUuid = jest
        .spyOn(userRepository, 'getOneByUuid')
        .mockResolvedValue(user);

      const result = await userService.getOneByUuid(uuid);

      expect(result).toEqual({
        uuid: '1',
        name: 'test_user',
        email: 'test@gmail.com',
        imageUrl: '',
      });
      expect(getOneByUuid).toBeCalledTimes(1);
    });
  });

  describe('get user list by page', () => {
    it('succeed', async () => {
      const getList = jest
        .spyOn(userRepository, 'getList')
        .mockResolvedValue([user]);

      const result = await userService.getList(1);
      expect(result).toEqual({
        data: [
          {
            email: 'test@gmail.com',
            imageUrl: '',
            name: 'test_user',
            uuid: '1',
          },
        ],
        meta: { cur_page: 1, next_page: 2, page_num: 10 },
      });
      expect(getList).toBeCalledTimes(1);
    });
  });
});
