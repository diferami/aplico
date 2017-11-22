<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Asistencia extends CI_Model {

	function __construct(){
		parent::__construct();
	}
	
	function create($data){
		
		if(!$this->db->insert('asistencia', $data))
			return false;
		
		return $this->db->insert_id(); 
	}

	function get_by_id($id){
		$usuarios = $this->db->get_where('asistencia', array('id' => $id))->result();
		if(!count($usuarios))
			return null;
		return $usuarios[0];		
	}

	function update($id, $data){
		return $this->db->update('asistencia', $data, array('id' => $id));
	}

	
}