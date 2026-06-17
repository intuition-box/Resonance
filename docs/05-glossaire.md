# 05 · Glossaire technique

### Delegation Framework (MetaMask)
Framework de **permissions programmables** de MetaMask, dérivé du projet open-source **Delegatable** (Dan Finlay). Productisé, audité, intégré au wallet, puis entièrement open-sourcé. Permet de déléguer à une dApp ou un agent le droit d'agir au nom de l'utilisateur, de façon strictement bornée.

### Object capabilities
Concept d'informatique (~1970) au fondement du framework. Métaphore de la **« carte postale signée »** : je signe une permission pour quelqu'un (« tu peux retirer 10 $, mais seulement à la pleine lune / si le prix de l'ETH dépasse X »). Le destinataire peut **re-signer** cette permission à un tiers → **chaîne de confiance**.

### Délégation (delegation)
Un objet de permission signé. Contient notamment :
- le **delegate** (à qui on donne la permission),
- le **delegator** (qui donne),
- des **caveat enforcers** (les conditions).

Signature **gasless** via **EIP-712 signed typed data**.

### Caveat enforcer
Contrat **arbitraire** respectant une interface commune avec des **hooks** `before` et/ou `after`. **Composable** : on combine plusieurs enforcers pour exprimer une permission précise.
- Ex. : `ERC-20 transfer enforcer` + `expiration timestamp enforcer` = « transférer 100 USDC/jour pendant 7 jours ».

### Délégation transitive (re-delegation / attenuation)
Le delegate peut **re-déléguer** une permission reçue, en l'**atténuant** : « tu peux transférer 100 tokens » → re-délégué en « tu peux transférer 20 tokens, avant dimanche » → et ainsi de suite.

### Permission intent-based (after hooks)
Permission conditionnée à un résultat : « 100 tokens **si et seulement si** je reçois ce NFT (ou un million de ces tokens) en retour ». Plus de garde-fous, expression exacte de l'intention.

### Enforced simulations
Fonctionnalité à venir dans le wallet : la transaction est enveloppée dans une délégation et **se produit exactement comme prévu, sinon revert total**. Ce n'est plus une simulation « best effort ».

### Knowledge graph (Intuition)
Graphe de données massif d'Intuition : **atoms**, **triples**, **markets**, scores de **trust/réputation**. « Un graphe de réputation à propos de tout. » Fournit la couche sémantique « qui/quoi est digne de confiance ».

### Atom / Triple
Briques du knowledge graph d'Intuition. Un **atom** = une entité/un item. Un **triple** = une relation structurée (sujet-prédicat-objet) entre atoms. On **stake/dépose** dessus pour exprimer/renforcer la confiance.

### Ontologie
La **définition** d'un knowledge graph : quels types de triples et quelle structure utiliser pour organiser des données de façon **sémantique** et signifiante (cf. mission 13).

### Semantic Delegation
Le sujet du Space : combiner Delegation Framework + knowledge graph pour passer de délégations **littérales** (adresse/fonction/contrat précis) à des délégations **sémantiques et dynamiques** fondées sur la réputation et le contexte (« tout ce qui a une réputation > 90 dans tel domaine »).

### Liquid democracy
Gouvernance mêlant démocratie **directe** (voter soi-même) et **délégative** (déléguer son vote), avec **chaînes de délégation** multi-niveaux et **vote contextualisé** par compétence. S'oppose à la **plutocratie** (vote pondéré par les tokens).

### Plutocracy
Gouvernance où le pouvoir de vote est **pondéré par la quantité de tokens** détenus. Présentée comme la limite que la liquid democracy cherche à dépasser.

### Intuition skill
Repo/outil (créé par **JP/GP**) packageant le contexte d'usage et de design d'Intuition pour accélérer les builders et agents. Cible de la **mission 12** (lui ajouter la délégation).

### X402
Standard/medium de **paiement pour agents** (paiements à l'intersection du monde réel). Cité comme brique des cas d'usage agents (billetterie, dépenses bornées « 50 $ chez ce vendeur »). Sujet d'un prochain Space.

### EIP-7715
**Advanced permissions** dans le wallet : demander des permissions **fine-grained** directement depuis l'extension MetaMask (aujourd'hui extension ; mobile à venir).

### EIP-7710
Standard lié au **Delegation Framework** (délégation on-chain / smart accounts), cité dans la roadmap MetaMask.

### Smart Accounts / Smart Accounts Kit
Comptes intelligents MetaMask (équipe dirigée par Ryan McPeck) ; le **Smart Accounts Kit** est l'objet du travail go-to-market de Jordan.

### Red Balloon Challenge
Démo historique (ECC Brussels) : 10 ballons rouges impossibles à collecter seul (contraintes de temps/lieu) → **coopération forcée** via partage de délégations (« je te prête mon ballon si je touche 10 % des gains »).

### Delegatable
Projet **open-source de Dan Finlay** (origine du Delegation Framework). Kames l'a fait découvrir à Ryan ; point de départ de toute l'histoire (2020 → ETHDenver 2023).
