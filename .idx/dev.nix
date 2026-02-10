{ pkgs, ... }: {
  # Packages à installer dans l'environnement
  packages = [
    pkgs.git
  ];

  # Configuration spécifique à IDX
  idx = {
    # Extensions à installer (liste vide ou à remplir)
    extensions = [ ];

    # Configuration de l'espace de travail
    workspace = {
      # Commandes exécutées à chaque ouverture de l'espace
      onStart = {
        # Synchronisation Git
        # On utilise une chaîne pour la commande
        sync-repo = "git pull origin main --no-rebase || true";
      };
    };

    # Activation des aperçus
    previews = {
      enable = true;
    };
  };
}