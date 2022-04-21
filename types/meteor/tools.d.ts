export {};

type AnyObject = Record<string, unknown>;

declare global {
  // 'meteor/tools/isobuild/package-api'
  namespace Package {
    function describe(options: {
      summary?: string;
      version?: string;
      name?: string;
      git?: string;
      documentation?: string;
      debugOnly?: boolean;
      prodOnly?: boolean;
      testOnly?: boolean;
    }): void;

    function onTest(func: (api: PackageAPI) => void): void;

    function onUse(func: (api: PackageAPI) => void): void;

    function registerBuildPlugin(options?: {
      name?: string;
      use?: string | string[];
      sources?: string[];
      npmDependencies?: AnyObject;
    }): void;

    type Filename = string;
    type Filenames = Filename | Array<Filename>;
    type PackageName = string;
    type PackageNames = PackageName | Array<PackageName>;
    type Architecture =
      | 'client'
      | 'server'
      | 'legacy'
      | 'web.browser'
      | 'web.cordova';
    type Architectures = Architecture | Array<Architecture>;

    interface PackageAPI {
      addAssets(filenames: Filename, architecture: Architectures): void;
      addFiles(
        filenames: Filenames,
        architecture?: Architectures,
        options?: { bare?: boolean }
      ): void;
      imply(packageNames: PackageNames, architecture?: Architectures): void;
      use(
        packageNames: PackageNames,
        architecture?: Architectures,
        options?: {
          weak?: boolean;
          unordered?: boolean;
        }
      ): void;
      versionsFrom(meteorRelease: string | string[]): void;
      mainModule(filenames: Filenames, architecture?: Architectures);
    }
  }
}
