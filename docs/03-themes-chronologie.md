# 03 — Thèmes & chronologie

Déroulé thématique des deux parties. Les blocs suivent l'ordre réel de la conversation.

## Partie 1 — Fondations & origine

### 1. Ouverture & présentations
- Matt ouvre, fait monter les intervenants sur scène (quelques soucis techniques front-end pour les inviter).
- Présentation du trio d'organisations : MetaMask, Intuition (core), Intuition Box.
- Tour de table express : Zett, Billy, Kames, Ryan, Jordan se présentent.

### 2. Pourquoi la délégation a besoin de sémantique
- Question-pivot posée par Matt : *pourquoi l'autorité déléguée a-t-elle besoin d'une compréhension sémantique / de paramètres supplémentaires issus des données structurées du knowledge graph ?*
- Jordan pose le cadre : délégations = laisser dApps/agents agir au nom de l'utilisateur ; le knowledge graph décide **qui et quoi** est digne de confiance.

### 3. L'origin story du Delegation Framework (Ryan)
- 2020 : Kames fait découvrir à Ryan le projet open-source **Delegatable** de **Dan Finlay**.
- **ETHDenver 2023** : talk de Dan Finlay sur la délégation → déclic.
- Dan monte une équipe dédiée Smart Accounts chez MetaMask, Ryan la dirige.
- Delegatable → **Delegation Framework audité**, intégré au wallet, puis **100 % open-source**. Décrit comme une contribution open-source majeure « sur laquelle tout le monde dort ».

### 4. Plongée technique : object capabilities & caveat enforcers
- **Object capabilities** (concept CS ~1970) : la métaphore de la « carte postale signée » qui transmet une permission, re-signable de proche en proche → **chaîne de confiance / chaîne de permissions**.
- **Caveat enforcers** (Ryan) : contrats arbitraires respectant une interface (hooks `before` / `after`), composables. Exemples : transfert ERC-20, expiration timestamp → « transférer 100 USDC/jour pendant 7 jours ».
- **Délégation transitive** : re-déléguer en **atténuant** (100 → 20 tokens, avant dimanche…).
- **Permissions intent-based** (after hooks) : « 100 tokens si et seulement si je reçois ce NFT en retour ».
- **Enforced simulations** (à venir dans le wallet) : la transaction se passe exactement comme simulé, sinon revert total.

### 5. Boucles de croissance virales (Kames)
- Donner des délégations qui **récompensent l'usage** (5 dépôts → 5 dépôts gratuits).
- **Onboarding d'amis** : déléguer un droit de dépôt borné (un seul atom/triple), prouvable on-chain, qui récompense aussi le parrain.
- Rappel du **Red Balloon Challenge** (ECC Brussels) : 10 ballons impossibles à collecter seul → coopération forcée via partage de délégations.
- « Je sens une opportunité de partenariat » → idée à formaliser.

### 6. Mission 13 introduite : registre communautaire de caveat enforcers
- Idée née d'une discussion Zett × MetaMask à l'ECC.
- MetaMask maintient aujourd'hui une liste « bare bones » de caveat enforcers ; mais **qui maintient la liste des enforcers recommandés / auditables / fiables selon le contexte ?**
- Réponse : **Intuition** et sa capacité à laisser la communauté **s'auto-organiser** (curation, listes communautaires, **ontologie**).

> Fin de partie 1 (coupée par l'incident technique en plein milieu d'un point sur la composabilité, autour de la mission 10).

---

## Partie 2 — Gouvernance, agents & missions

### 7. Reprise
- Matt reprend après le crash : « le show continue ».

### 8. Liquid democracy (Zett) — missions 10 & 11
- Constat : beaucoup de DAO restent en **plutocratie** (vote pondéré par les tokens).
- **Liquid democracy** = mêler démocratie directe (voter soi-même) et délégative (élire un votant), avec des **chaînes de délégation** (je délègue, mon délégué re-délègue…).
- Atout du Delegation Framework : les contrats de gouvernance restent **simples**, toute la complexité de sub-délégation vit dans le framework.
- Apport d'Intuition : **vote contextualisé par compétence/expertise**. Ex. : je délègue tout ce qui touche au design à Saulo ; Saulo re-délègue le 3D à un meilleur expert.
- Délégation **révocable par la réputation** : déléguer à qui a un atom suffisamment staké/trusté ; si la confiance est retirée on-chain, la personne ne peut plus voter en mon nom.

### 9. Délégations fluides fondées sur la réputation (Billy)
- Passer de délégations **littérales** (« Kames peut utiliser 100 USDC dans ce contrat précis ») à des délégations **généralisées** : « peut interagir avec tout ce qui a un score de réputation > 90 ».
- Intuition = « un graphe de réputation à propos de tout ».
- Débloque des **agents IA** agissant sur de larges périmètres, en confiance, sans compiler à la main la liste des contrats autorisés.

### 10. Ensembles d'acteurs & attestations (Billy)
- « Autoriser n'importe quel membre de l'équipe MetaMask à voter en mon nom » → où vivent ces adresses ? Agrégateur centralisé **ou** état décentralisé d'attestations + trust anchors.
- L'expression de la permission s'appuie alors sur l'**état on-chain** : ensembles d'acteurs × ensembles d'actions.

### 11. Cas d'usage grand public (Matt) : billetterie & agents
- Concert / enchères / billets de sport très demandés, sniping et revente.
- Avec agents + **X402** : déléguer 100 $ à 3 agents concurrents pour décrocher une place ; on ne paie jamais plus que ce qu'on délègue ; pas de serveur ni de service de sniping à monter.
- Ryan : objectif = **renverser la logique du wallet**. Aujourd'hui la dApp construit la transaction et le wallet la parse/espère. Demain : l'app/agent **demande**, l'utilisateur **exprime** précisément, et accorde une capability strictement bornée.

### 12. Agents IA & finance réelle
- Permissionner un agent : « tu peux dépenser 50 $ chez ce vendeur, à cette adresse X402, ça expire ».
- Analogie : l'utilisateur devient « comme Anthropic » qui pose les garde-fous de sécurité autour du modèle.

### 13. Tour des missions (gradient de complexité)
- Missions **9 à 13** ouvertes, gradient de difficulté.
- Entrées faciles : **9** (tutoriel délégation) et **12** (étendre l'Intuition skill).
- **13** (registre de caveat enforcers), **10/11** (liquid democracy POC → prod, séquencées).
- Conseil de Zett : **ré-écouter le Space** ; les candidats retenus seront « ceux qui comprennent la vision ».

### 14. Clôture
- Annonce session Discord du lendemain (Zett & Saulo, ~2 h).
- Roadmap MetaMask : **7715**, **7710**, **X402**, agent wallet, CLI.
- Billy : « début d'un boom de choses construites à l'intersection Intuition × Delegation Framework ». Teasing X402 pour la suite.
- Rappels : postuler aux 5 missions, suivre les comptes, rejoindre le Discord.
