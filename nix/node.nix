{ sources ? import ./sources.nix }:

let
  pkgs = import sources.nixpkgs { overlays = [ (import sources.nixpkgs-nodejs) ]; };
in chan