<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $table = 'fournisseurs'; // Specify the table name if different from class name + s
    protected $primaryKey = 'idFourn'; // Specify the primary key field if different from 'id'
    
    protected $fillable = [
        'codeFourn',
        'nomFournisseur',
    ];
}