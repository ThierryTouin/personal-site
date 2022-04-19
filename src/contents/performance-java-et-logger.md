---
title: "Performance Java et Logger !"
description: "Un benchmark des logs." 
date: "2022-04-13"
---

Je voulais vous présenter un benchmark que j'ai réalisé, il y a déjà deux ans.

Le test met en évidence que lorqu'on écrit du code Java avec des logs, il faut bien commencer une ligne de log par `if (logger.isXXXXEnabled()) ` pour avoir de meilleures performances dans l'execution de ce code.

Malheureusement, je vois souvent du code sans ce `if` essentiel :-( .

Cela est particulièrement vrai lorsque le message à afficher est la concatenation de plusieurs chaines de caractères. 

Exemple :

1. `if (logger.isDebugEnabled()) logger.debug("logger4" + Math.random());`

2. `logger.debug("logger4" + Math.random());`

La ligne 1 est plus performante en mode info car elle commence par un `if`. 
Sans ce `if` (ligne 2), la méthode `logger.debug` s'exécute (même en mode info) car la librairie de logging doit vérifier la méthode pour savoir dans quel mode, elle est configurée. Or pour exécuter cette méthode, la chaîne finale résultant de la concaténation `"logger4" + Math.random()` est créée. 

> La concaténation prend plus de temps que d'executer un `if`.


Vous trouverez le code source [ici](https://github.com/ThierryTouin/Benchmark).

