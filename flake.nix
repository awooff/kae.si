{
  description = "Kaeforest umu";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };
  outputs = { self, nixpkgs, flake-utils, pre-commit-hooks }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
      src = ./.;
    in {
        packages = rec {

          config = pkgs.stdenv.mkDerivation {
            pname = "kaeforest-config";
            inherit src;

            phases = "installPhase";

            installPhase = ''
              cd $src
              npm install 
            '';
          };

          static = pkgs.stdenv.mkDerivation {
            pname = "kaeforest-static";
            inherit src;

            phases = "installPhase";

            installPhase = ''
              npm run build
            '';
          };
        };
    }
    {
      checks = {
        pre-commit-check = pre-commit-hooks.lib.${system}.run {
          src = ./.;
          hooks = { nixfmt.enable = true; };
        };
      };
    }
  );
}
