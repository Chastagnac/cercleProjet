<?php

// $conn = new mysqli("localhost", "root", "", "cercleprojet");
// if($conn->connect_error) {
//     die("Connection failed! " .$conn->connect_error);
// }
// $result = array('error'=>false);
// $action = '';


// if(isset($_GET['action'])) {
//     $action = $_GET['action'];
// }
// if($action == 'read') {
//     $sql = $conn->query("SELECT * FROM stats");
//     $stats = array();
//     while($row = $sql->fetch_assoc()) {
//         array_push($stats, $row);
//     }
//     $result['stats'] = $stats;
// }

// echo json_encode($result);


class PdoWiki
{

    private static $serveur = 'mysql:host=localhost';
    private static $bdd = 'dbname=cercleprojet';
    private static $user = 'root';
    private static $mdp = '';
    private static $monPdo;
    private static $monPdoWiki = null;


    // private static $serveur = 'mysql:host=mysql-chastagnac.alwaysdata.net';
    // private static $bdd = 'dbname=chastagnac_wiki_fiche';
    // private static $user = '243609_root';
    // private static $mdp = 'wiki_fiche1234';
    /**
     * Constructeur privé, crée l'instance de PDO qui sera sollicitée
     * pour toutes les méthodes de la classe
     */
    private function __construct()
    {
        PdoWiki::$monPdo = new PDO(
            PdoWiki::$serveur . ';' . PdoWiki::$bdd,
            PdoWiki::$user,
            PdoWiki::$mdp
        );
        PdoWiki::$monPdo->query('SET CHARACTER SET utf8');
    }

    /**
     * Méthode destructeur appelée dès qu'il n'y a plus de référence sur un
     * objet donné, ou dans n'importe quel ordre pendant la séquence d'arrêt.
     */
    public function __destruct()
    {
        PdoWiki::$monPdo = null;
    }

    /**
     * Fonction statique qui crée l'unique instance de la classe
     * Appel : $instancePdoWiki = PdoWiki::getPdoWiki();
     *
     * @return l'unique objet de la classe PdoWiki
     */
    public static function getPdoWiki()
    {
        if (PdoWiki::$monPdoWiki == null) {
            PdoWiki::$monPdoWiki = new PdoWiki();
        }
        return PdoWiki::$monPdoWiki;
    }

    /**
     * Retourne les informations d'un compte
     *
     * @param String $Email  Mail du compte
     * @param String $mdp   Mot de passe du compte
     * @return l'id, le nom et le prénom sous la forme d'un tableau associatif
     */
    public function getStats()
    {
        $requetePrepare = PdoWiki::$monPdo->prepare(
            'SELECT * from stats'
        );
        $requetePrepare->execute();
        return $requetePrepare->fetch();
    }

    /**
     * Permets de créer une fiche par un utilisateur
     *
     * @return null
     */
    function insertWord($word)
    {
        $requetePrepare = PdoWiki::$monPdo->prepare(
            'INSERT INTO `stats`(`word`, `date`) '
                . 'VALUES (:word, NOW())'
        );
        $requetePrepare->bindParam(':word', $word, PDO::PARAM_STR);
        $requetePrepare->execute();
    }
}

$pdo = PdoWiki::getPdoWiki();
$pdo->insertWord("demipension");
