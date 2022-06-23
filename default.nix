{ sources ? import ./nix/sources.nix, pkgs ? import sources.nixpkgs { } }:
with pkgs;

let
  node = pkgs.callPackage ./nix/node.nix { };
  nodejsVersion = lib.fileContents ./.nvmrc;

  nodejs = node {
    enableNpm = true;
    version = nodejsVersion;
    sha256 = "1a0zj505nhpfcj19qvjy2hvc5a7gadykv51y0rc6032qhzzsgca2";
  };

  srcNoTarget = dir:
    builtins.filterSource
    (path: type: type != "directory" || builtins.baseNameOf path != "target")
    dir;

  src = srcNoTarget ./.;

in
  stdenv.mkDerivation {
    pname = "kaeforest-config";
    version = "HEAD";

    phases = "installPhase";

    buildPhase = ''
      cd ${src}
      npm install
    '';

    installPhase = ''
      cd ${src}
      npm run build
    '';
  }
