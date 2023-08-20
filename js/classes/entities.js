class Entity{
    //location
    //health
    //size
    //speed
    //direction
    //team/owner here instead of in Ship and Station?
}

class Ship extends Entity{
    //owner/team
    //module count

    //ship types will be defined elsewhere, pre-defined stats like speed, armor, module count, etc
}

class Station extends Entity{ //Space station type objects, including things like mining platforms, defense stations, etc
    //team
    //module count

    //station types defined elsewhere, same as Ship
}

class SpaceBody extends Entity{ //Asteroids, planets
    //SpaceBody types defined elsewhere, potentially slightly randomised stats
}

class Projectile extends Entity{ //Projectiles from weapons
    //damage?
    //lifespan (how long projectile flies until it despawns / self-destructs)
}

class SeekingProjectile extends Projectile{ //For seeking missiles/rockets etc.
    //target
}

class Module{ //Ship equipment slots like weapons, storage, shield

}

class Weapon extends Module{ //Weapon modules

}