{
  # thanks winter, you rock
  description = "Kaeforest - a mind journal & wiki for Kae.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    npmlock2nix = {
      url = "github:nix-community/npmlock2nix";
      flake = false;
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{ self, nixpkgs, flake-utils, ... }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      npmlock2nix = import inputs.npmlock2nix { inherit pkgs; };
      npmPkg = npmlock2nix.node_modules { src = self; };
    in
    {
      packages.kaeforest = npmPkg;
      packages.default = self.packages.${system}.kaeforest;

      devShells.default = npmlock2nix.shell { src = self; };
    });
}
