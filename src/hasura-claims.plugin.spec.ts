import { Test, TestingModule } from '@nestjs/testing';
import { HasuraClaimsPlugin } from './hasura-claims.plugin';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { TokenModule } from '@brewww/authentication-service/dist/src/token/token.module';
import { HasuraCustomClaimsImporter } from './concrete/hasura-custom-claims-importer.type';

describe('HasuraClaimsPlugin', () => {
  let plugin: HasuraClaimsPlugin;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TokenModule],
      providers: [HasuraClaimsPlugin],
    }).compile();

    plugin = module.get<HasuraClaimsPlugin>(HasuraClaimsPlugin);
    await plugin.load();
    tokenService = module.get<TokenService>('TokenService');
  });

  it('Should be defined', () => {
    expect(plugin).toBeDefined();
  });

  it('should add HasuraCustomClaimsImporter to TokenService', async () => {
    const addCustomClaimImporterSpy = jest.spyOn(
      tokenService,
      'addCustomClaimImporter',
    );

    await plugin.load();

    expect(addCustomClaimImporterSpy).toHaveBeenCalledWith(
      new HasuraCustomClaimsImporter(),
    );
  });
});
