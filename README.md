# COURSE-APP CLI

> ## Description
>
> Le but est de pouvoir grâce à une ligne de commande d'initialiser un module associer à un cours.
>
> - Supports:
>   - Les cours React et Typescript legacy.
>   - Les cours Next.

## Utilisation

- Lancez la commande dans le termninal: `course-app`.
- Choisir le cours à initialiser: `React` ou `Typescript`.
- Choisir entre les modules disponible.

## Dévelopement

- Lancez dans la commande dans le terminal: `pnpm build`.
- Ouvrez un autre terminal puis:
  - Si c'est la 1ère fois, il faut lier l'application. Dans ce cas lancez la commande `pnpm link --global`.
  - Si l'application est lié lancez `pnpm link-cli`.

## Déploiement

En construction, ne pas prendre en compte:

> Pour déployer le `CLI`: lancer la commande `npm init --scope=mikecodeur`.
> Pour installer le nouveau paquet: `pnpm add @mikecodeur/course-app-cli`.
