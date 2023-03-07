{
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

  outputs = inputs@{ self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        npmlock2nix = import inputs.npmlock2nix { inherit pkgs; };
        npmPkg = npmlock2nix.node_modules { src = self; };
      in {
        devShell = pkgs.mkShell rec {
          buildInputs = with pkgs; [ nodejs-18_x yarn jq ];
          # For proper yarnv2 intergration, you'll need to run the steps listed here;
          # <https://github.com/stephank/yarn-plugin-nixify>
          # This is a temporary workaround until nixpkgs ship v2 by default.
          shellHook = ''
                export PATH="$PWD/node_modules/.bin/:$PATH"
                alias scripts='jq ".scripts" package.json'
            		alias run='npm run'
                alias g='git' \
                    ga='g add' \
                    gl='g pull' \
                    gf='g fetch' \
                    gp='g push' \
                    gst='g status' \
                    gcm='g commit -m' \
                    gcmsg='g add -A; g commit -am'
          '';
        };
        packages.kaeforest = npmPkg;
        packages.default = self.packages.${system}.kaeforest;
      });
}
